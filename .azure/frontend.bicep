@minLength(3)
@maxLength(24)
param storageAccountName string

param customDomain string = ''

param location string = resourceGroup().location

resource storageAccountResource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccountName
  location: location
  sku:{
    name:'Standard_LRS'
  }
  kind:'StorageV2'
}

resource storageAccountContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2019-06-01' = {
  name: '${storageAccountResource.name}/default/web'
  properties:{
    publicAccess: 'Blob'
  }
}

resource storageAccountCdn 'Microsoft.Cdn/profiles@2020-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_Microsoft'
  }
}

resource storageAccountCdnEndpoint 'Microsoft.Cdn/profiles/endpoints@2020-09-01' = {
  parent: storageAccountCdn
  name: storageAccountName
  location: location
  properties: {
    originHostHeader: replace(replace(storageAccountResource.properties.primaryEndpoints.blob, 'https://', ''), '/', '')
    origins: [
      {
        name: 'storage'
        properties: {
          hostName: replace(replace(storageAccountResource.properties.primaryEndpoints.blob, 'https://', ''), '/', '')
        }
      }
    ]
    deliveryPolicy: {
      rules: [
        {
          name: 'Global'
          order: 0
          conditions:[]
          actions: [
            {
              name: 'UrlRewrite'
              parameters: {
                destination: '/web/'
                sourcePattern: '/'
                preserveUnmatchedPath:true
                '@odata.type': '#Microsoft.Azure.Cdn.Models.DeliveryRuleUrlRewriteActionParameters'
              }
            }
          ]        
        }
        {
          name: 'Spa'
          order: 1
          conditions:[
            {
              name: 'UrlFileExtension'
              parameters: {
                operator: 'LessThan'
                negateCondition: false
                matchValues: [
                  '1'
                ]
                transforms: []
                '@odata.type': '#Microsoft.Azure.Cdn.Models.DeliveryRuleUrlFileExtensionMatchConditionParameters'
              }
            }
          ]
          actions: [
            {
              name: 'UrlRewrite'
              parameters: {
                destination: '/web/index.html'
                sourcePattern: '/'
                preserveUnmatchedPath:false
                '@odata.type': '#Microsoft.Azure.Cdn.Models.DeliveryRuleUrlRewriteActionParameters'
              }
            }
          ]          
        }
      ]
    }
  }
}

resource storageAccountCdnEndpointDomain 'Microsoft.Cdn/profiles/endpoints/customDomains@2020-09-01' = if (!empty(customDomain)) {
  parent: storageAccountCdnEndpoint
  name: '${storageAccountName}-domain'
  properties: {
    hostName: customDomain
  }
}

output cdnHostName string = storageAccountCdnEndpoint.properties.hostName
output hostName string = empty(customDomain) ? storageAccountCdnEndpoint.properties.hostName : customDomain
