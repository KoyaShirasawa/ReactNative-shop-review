import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  if(Constants.platform.ios){
    const {status} = await ImagePicker.getCameraPermissionsAsync();
    if(status !== "granted"){
      alert("画像を選択するためにはカメラロールの許可が必要です")
    }
  }
}

export const pickImage = async () => {
  //パーミッションを取得
  await getCameraRollPermission();
  //Image Pickerを起動
  const result = await ImagePicker.launchImageLibraryAsync({
    madiaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false
  });
  if(!result.cancelled){
    return result.uri;
  }
}