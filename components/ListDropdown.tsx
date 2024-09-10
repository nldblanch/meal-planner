import React from 'react'
import { Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
type List = {
    list_id: string;
    isPrivate: boolean;
    list_name: string;
}
function ListDropdown({data} : any) {
  return (
    <SelectDropdown
    data={data}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View>
          <Text>
            {selectedItem && selectedItem.list_name || 'Select list'}
          </Text>
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
        return (
        <View >
          <Text>{item.list_name}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    
  />
  )
}

export default ListDropdown