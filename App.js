import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import imagex from './assets/icons/eco-light-off.png';
import imagey from './assets/icons/eco-light.png';
import diox from './assets/icons/logo-dio.png';
import dioy from './assets/icons/logo-dio-white.png';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Liga o flash do cel
    Torch.switchState(toggle);
  },[toggle]);

  useEffect(()=>{
//Quando o cel for chacoalhado mudaremos o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });
    //Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  },[toggle]);

  return (
    <View style={toggle ? style.containerLight : style.container}>
        <TouchableOpacity onPress={handleChangeToggle}>
          <Image
            style={toggle ? style.lightingOn : style.lightingOff}
            source={toggle ? imagey : imagex}></Image>
          <Image style={style.dioLogo} source={toggle ? diox : dioy}></Image>
        </TouchableOpacity>
      </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    tintColor: 'white',
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
