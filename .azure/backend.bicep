param appName string = ''
param environmentName string = ''
param dockerImage string = ''
param logAnalyticsSKU string = ''

var location = resourceGroup().location

resource workspace 'Microsoft.OperationalInsights/workspaces@2020-08-01' = {
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

resource environment 'Microsoft.Web/kubeEnvironments@2021-03-01' = {
  name: environmentName
  location: location
  properties: {
    type:'Managed'
    internalLoadBalancerEnabled: false
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: listKeys(workspace.id, workspace.apiVersion).primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.Web/containerapps@2021-03-01' = {
  name: appName
  kind: 'containerapps'
  location: location
  properties: {
    kubeEnvironmentId: environment.id
    configuration: {
      ingress: {
        external:true
        targetPort:80
      }
    }
    template: {
      containers: [
        {
          name: environmentName
          image: dockerImage          
          resources:{
            cpu:'.25'
            memory:'.5Gi'
          }
        }
      ]
    }
  }
}

output applicationURL string = containerApp.properties.configuration.ingress.fqdn
