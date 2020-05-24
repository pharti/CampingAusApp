
import event from './Events'
import NetInfo from "@react-native-community/netinfo";

_handleConnectivityChange = (connection) => {
    console.log("_handleConnectivityChange >> ", connection);
    event.emit("internet",{connection})
  };
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        _handleConnectivityChange
    );


    NetInfo.isConnected.fetch().done((connection) => {
        _handleConnectivityChange(connection)
    })











