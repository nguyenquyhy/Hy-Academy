@minLength(3)
@maxLength(24)
param storageAccountName string

resource storageAccountResource 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageAccountName
  location: resourceGroup().location
  sku:{
    name:'Standard_LRS'
  }
  kind:'StorageV2'
}
