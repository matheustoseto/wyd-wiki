import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import DropList from './pages/DropList'
import Details from './pages/Details'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'WYD - WIKI'
      }
    },
    DropList: {
      screen: DropList,
      navigationOptions: {
        title: 'DropList'
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Detalhes'
      }
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#b52421'
      }
    }
  })
)

export default Routes
