@minLength(3)
@maxLength(24)
param location string = resourceGroup().location
param utcValue string = utcNow()
param storageAccountName string

resource storageAccountResource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccountName
  location: location
  sku:{
    name:'Standard_LRS'
  }
  kind:'StorageV2'
}

var storageAccountContributorRoleDefinitionId  = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '17d1049b-9a84-46fb-8f53-869881c3d3ab') // This is the Storage Account Contributor role, which is the minimum role permission we can give. See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: 'DeploymentScript'
  location: location
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2020-10-01-preview' = {
  scope: storageAccountResource
  name: guid(resourceGroup().id, managedIdentity.id, storageAccountContributorRoleDefinitionId)
  properties: {
    roleDefinitionId: storageAccountContributorRoleDefinitionId
    principalId: managedIdentity.properties.principalId
  }
}

resource reactStorageAccount_script_enable_website 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: '${storageAccountName}_script_enable_website'
  location: resourceGroup().location
  kind: 'AzureCLI'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    forceUpdateTag: utcValue
    azCliVersion: '2.28.0'
    environmentVariables: [
      {
        name: 'StorageAccountName'
        value: storageAccountName
      }
    ]
    scriptContent: 'az storage blob service-properties update --account-name $StorageAccountName --static-website --index-document index.html --404-document index.html'
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
  }
  dependsOn: [
    storageAccountResource
    roleAssignment
  ]
}
