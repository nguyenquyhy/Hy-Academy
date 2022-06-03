param location string = resourceGroup().location
param functionAppName string
param storageAccountName string
param connectionString string
param mySqlVersion string
param currentPackage string = '1'

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: functionAppName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'Storage'
}

resource hostingPlan 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: functionAppName
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {
    reserved: true // Linux
  }
}

resource b2c_connector 'Microsoft.Web/sites@2021-03-01' = {
  name: functionAppName
  kind: 'functionapp,linux'
  location: location
  properties: {
    serverFarmId: hostingPlan.id
    siteConfig: {
      linuxFxVersion: 'dotnet|6.0'
      appSettings: [
        // Initially we will set this to 1, so that code deployment is not ovewritten by ARM deployment.
        // This value will be set to a storage URL after code deployment, so we need to retain the value here.
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: currentPackage == '' ? '1' : currentPackage
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'dotnet'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: applicationInsights.properties.InstrumentationKey
        }
        {
          name: 'ConnectionStrings_Default'
          value: connectionString
        }
        {
          name: 'MySql_Version'
          value: mySqlVersion
        }
      ]
    }
  }
}
