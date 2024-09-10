import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
type List = {
    list_id: string;
    isPrivate: boolean;
    list_name: string;
}
function ListDropdown({data, setListItems} : any) {

  return (
    <SelectDropdown
    data={data}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
      //fetch items from list and setListItems(items)
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {selectedItem && selectedItem.list_name || 'Select list'}
          </Text>
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
        return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.list_name}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
  )
}
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#BBB',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
export default ListDropdown