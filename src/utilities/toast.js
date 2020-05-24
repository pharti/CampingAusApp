import { Toast } from 'native-base';

// warning success, danger
export const toast = ({text="",position="bottom",buttonText="", type="success", duration=5000})=>{
    Toast.show({text, position, buttonText, type, duration });
}
