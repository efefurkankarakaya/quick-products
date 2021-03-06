import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useDispatch} from 'react-redux';
import {updateActiveForm} from '../../redux/reducers/formReducer';
import {getItem} from '../../utils/databaseHelpers';

import Dialog from 'react-native-dialog';

import {sendCreateFormRequest, sendGetFormsRequest} from '../../controllers/';

import {logError, logOutput} from '../../utils/logHelpers';

import styles from './Dashboard.style';
import {CustomItem, CustomRoundedButton} from '../../components';
import {Doc, AddButton} from '../../assets';

async function createForm(formTitle) {
  const scopes = ['Dashboard', 'createForm'];
  try {
    const {appKey} = await getItem('user');
    return await sendCreateFormRequest(appKey, formTitle);
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function loadForms() {
  const scopes = ['Dashboard', 'loadForms'];
  try {
    const {appKey} = await getItem('user');
    return await sendGetFormsRequest(appKey);
  } catch (err) {
    logError(scopes, err.message);
  }
}

function Dashboard({navigation}) {
  const dispatch = useDispatch();

  const [forms, setForms] = useState([]); // Form Array
  const [isVisible, setIsVisible] = useState(false); // Dialog Visibility
  const [formTitleInputText, setFormTitleInputText] = useState(''); // Dialog Input Data

  // When the component is mounted, then load forms.
  useEffect(() => {
    loadForms().then(forms => setForms(forms));
  }, [forms]);

  // Clears the dialog input after action.
  const clearDialogInput = () => setFormTitleInputText('');

  // Handles the cancel option in the dialog.
  const handleCancel = () => {
    setIsVisible(false);
    clearDialogInput();
  };

  // Handles the create option in the dialog.
  const handleCreate = () => {
    setIsVisible(false);
    createForm(formTitleInputText).then(({id: formId, title: formTitle}) => {
      const activeFormData = {
        formId,
        formTitle,
      };
      dispatch(updateActiveForm(activeFormData));
      clearDialogInput();
      navigation.navigate('Quick Forms', {
        screen: 'Form Detail',
      });
    });
  };

  // Displays dialog to create a new form.
  const displayDialog = () => {
    setIsVisible(true);
  };

  // Create Form Item onPress Handler
  const onCreateFormPress = () => {
    displayDialog();
  };

  // Form Item onPress Handler
  const onFormPress = (formId, formTitle) => {
    const scopes = ['Dashboard', 'onFormPress'];
    logOutput(scopes, formId, formTitle);
    const activeFormData = {
      formId,
      formTitle,
    };
    dispatch(updateActiveForm(activeFormData));
    navigation.navigate('Quick Forms', {
      screen: 'Form Detail',
    });
  };

  // FlatList Functions
  const renderForm = ({item: form}) => (
    <CustomItem
      title={form.title}
      subText={'Last change: ' + form.updated_at}
      onPress={() => onFormPress(form.id, form.title)}
      image={Doc}
    />
  );
  const extractKey = (item, _) => item.id;

  return (
    <View style={styles.container}>
      <View>
        <Dialog.Container visible={isVisible}>
          <Dialog.Title>Form Creation</Dialog.Title>
          <Dialog.Description>Give your form a title.</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Input
            value={formTitleInputText}
            onChangeText={setFormTitleInputText}
          />
          <Dialog.Button label="Create" onPress={handleCreate} />
        </Dialog.Container>
      </View>
      <FlatList
        keyExtractor={extractKey}
        data={forms}
        renderItem={renderForm}
      />
      <CustomRoundedButton icon={AddButton} onPress={onCreateFormPress} />
    </View>
  );
}

export default Dashboard;
