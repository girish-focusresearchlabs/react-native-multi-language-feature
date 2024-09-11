import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
} from 'react-native';
import i18next, {languageResources} from './services/i18next';
import {useTranslation} from 'react-i18next';
import languagesList from './services/languagesList.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCountry} from 'react-native-localize';


const App = () => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  useEffect(() => {
console.log(getCountry());

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('my-key');
        console.log('present', value);

        if (value !== null) {
          i18next.changeLanguage(value);
        } else {
          i18next.changeLanguage('hi');
        }
      } catch (e) {
        console.error(e);
        i18next.changeLanguage('hi');
      }
    };

    getData();
  }, []);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {
    }
  };

  const changeLng = lng => {
    i18next.changeLanguage(lng);
    setVisible(false);
    storeData(lng);
    console.log(lng);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.languagesList}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLng(item)}>
                <Text style={styles.lngName}>
                  {languagesList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Text style={styles.text}>{t('Hey this is Girish')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t('change language')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9e092',
  },
  button: {
    backgroundColor: '#e545e7',
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    color: 'black',
  },
  languagesList: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f9e092',
  },

  languageButton: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: 'black',
  },
});

export default App;
