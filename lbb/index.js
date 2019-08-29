require('react-native')
console.disableYellowBox = true;
if(!__DEV__){
    require('ErrorUtils').setGlobalHandler(function (err) {
    });
}
import APP from './App'
