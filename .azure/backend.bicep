param environmentName string = ''
param dockerImage string = ''

var location = resourceGroup().location
var workspaceName = '${environmentName}-log-analytics'


resource workspace 'Microsoft.OperationalInsights/workspaces@2020-08-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'Free'
    }
  }
}

resource environment 'Microsoft.Web/kubeEnvironments@2021-03-01' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
      }
    }
  }
}

resource containerApp 'Microsoft.Web/containerapps@2021-03-01' = {
  name: environmentName
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
