import { getStartOfDay } from '@/scripts/utils/getDateNow';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
type ScrollableCalendarStripProps = {
  setDate: React.Dispatch<any>
}
const ScrollableCalendarStrip = ({setDate}) => (
  <View className='w-full bg-zinc-400 py-2 h-1/6'>
    <CalendarStrip
      scrollable
      style={{height:"100%", paddingTop: 5, paddingBottom: 5}}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white'}}
      iconContainer={{flex: 0.1}}
      onDateSelected={(date) => {
        setDate(date)
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default ScrollableCalendarStrip