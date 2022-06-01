param location string = resourceGroup().location
param logAnalyticsSKU string = 'PerGB2018'
param environmentName string
param appName string
param dockerImage string
param databaseConnectionString string
param customDomain string = ''

resource workspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: environmentName
  location: location
  properties: {
    sku: {
      name: logAnalyticsSKU
    }
    retentionInDays: 30
    workspaceCapping: {}
  }
}

// To successfully deploy this, the principal also needs permission to perform Microsoft.App/locations/managedEnvironmentOperationStatuses/read on the subscription.
resource environment 'Microsoft.App/managedEnvironments@2022-03-01' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: listKeys(workspace.id, workspace.apiVersion).primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2022-03-01' = {
  name: appName
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      activeRevisionsMode: 'multiple'
      ingress: {
        external: true
        targetPort: 80
        customDomains: (customDomain == '') ? [] : [
          {
            name: customDomain
            certificateId: resourceId('Microsoft.App/managedEnvironments/certificates', environment.name, customDomain)
            bindingType: 'SniEnabled'
          }
        ]
      }
      secrets: [
        {
          name: 'database-connection-string'
          value: databaseConnectionString
        }
      ]
    }
    template: {
      containers: [
        {
          name: environmentName
          image: dockerImage
          resources:{
            cpu: json('.25')
            memory: '.5Gi'
          }
          env: [
            {
              name: 'ConnectionStrings__Default'
              secretRef: 'database-connection-string'
            }
          ]
        }
      ]
    }
  }
}

output applicationURL string = containerApp.properties.configuration.ingress.fqdn
