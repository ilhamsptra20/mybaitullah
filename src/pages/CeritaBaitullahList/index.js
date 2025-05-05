import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useRoute } from '@react-navigation/native';

// COMPONENT
import { HeaderLogin, HeaderNotLogin, TextInputCeritaBaitullah, CardBlogHorizontal } from '../../components/index.js'

// ICON
import { IconArrowLeftWhite, IconSearcDarkgreen, IconSearchWhite } from '../../assets/index.js'

// STYLE
import BaseStyle from '../../assets/style/AppStyle.js'

// API
import userData from '../../hook/user/userFetch.js'
import categoryCeritaBaitullahData from '../../hook/categoryCeritaBaitullah/categoryCeritaBaitullahFetch.js'
import ceritaBaitullahData from '../../hook/ceritaBaitullah/ceritaBaitullahFetch.js'
import GridCeritaBaitullah from '../../components/molecules/GridCeritaBaitullah/index.js'

const CeritaBaitullahList = ({navigation}) => {
  // AMBIL KATEGORI
  const route = useRoute();
  const [category, setCategory] = useState([route.params])

  const width = Dimensions.get('window').width;

  // NAV SHADOW
  const [navShadow, setNavShadow] = useState(false);
  
  // status 0 belum login
  // status 1 sudah login
  let [status, setStatus] = useState(1);

  // USER DATA
  const {user, loadingUser, errorUser} = userData();

  // CERITA BAITULLAH CATEGORY
  const {categoryCeritaBaitullah, loadingCategoryCeritaBaitullah, errorCategoryCeritaBaitullah} = categoryCeritaBaitullahData();

  // CERITA BAITULLAH DATA
  const {ceritaBaitullah, loadingCeritaBaitullah, errorCeritaBaitullah} = ceritaBaitullahData();
  
  // FILTER
  const [searchText, setSearchText] = useState('');
  const [filteredCeritaBaitullah, setFilteredCeritaBaitullah] = useState(ceritaBaitullah);

  // FUNCTION FILTER
  const handleSearch = () => {
    if (searchText === '') {
      setFilteredCeritaBaitullah(ceritaBaitullah);
    } else {
      const filtered = ceritaBaitullah.filter((ceritaBaitullah) =>
        ceritaBaitullah.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCeritaBaitullah(filtered);
    }
  };

  return (
    <View style={[BaseStyle.container]}>
      <StatusBar backgroundColor='transparent' barStyle='white-content' translucent={true} />

      {/* HEADER */}
      <View style={[BaseStyle.absolute, BaseStyle.index1, BaseStyle.wFull, navShadow === true ? BaseStyle.navScroll : undefined, ({paddingTop: StatusBar.currentHeight + 10, paddingHorizontal: 14, paddingBottom: 10, backgroundColor: '#2CA44B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6})]}>
        <View style={[BaseStyle.row, BaseStyle.justifyBetween, BaseStyle.alignItemsCenter, BaseStyle.pb5]}>
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.w20, BaseStyle.w20]} onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite width={20} height={20} />
          </TouchableOpacity>
          <Text style={[BaseStyle.MaisonBold, BaseStyle.textWhite, BaseStyle.textMD]}>Cerita Baitullah</Text>
          <View style={[BaseStyle.w20, BaseStyle.w20]} />
        </View>
        <View style={[BaseStyle.relative, BaseStyle.mt10]}>
          <TextInputCeritaBaitullah placeholder="Cari Judul Cerita Baitullah Lainnya" placeholderColor="#208D33" icon={IconSearcDarkgreen} width="100%" value={searchText} onChangeText={setSearchText} />
          <TouchableOpacity activeOpacity={0.7} style={[BaseStyle.absolute, BaseStyle.justifyCenter, BaseStyle.alignItemsCenter, BaseStyle.rectangle, BaseStyle.BgDarkGreen500, ({width: 42, top: 0, right: 0, borderTopRightRadius: 12, borderBottomRightRadius: 12})]} onPress={handleSearch} >
            <IconSearchWhite width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          let offset = e.nativeEvent.contentOffset.y
          if(offset >= 1){
            setNavShadow(true)
          }else{
            setNavShadow(false)
          }
        }}
      >
        {/* CERITA LAINNYA */}
        <View style={{marginTop: StatusBar.currentHeight + 104}}>
          <View style={[BaseStyle.wrap]}>
            <View style={[BaseStyle.mb10]}>
              <Text style={[BaseStyle.MaisonBold, BaseStyle.textBlack, BaseStyle.textXL, BaseStyle.mb5]}>Cerita Lainnya</Text>
            </View>
            {!loadingCeritaBaitullah ? (
                <>
                  {(filteredCeritaBaitullah.length > 0 ? filteredCeritaBaitullah : ceritaBaitullah).map((item, y) => {
                    return(
                      <CardBlogHorizontal key={y} thumbnail={item.thumbnail} category={item.category} title={item.title} writer={item.writer} releaseDate={item.releaseDate} onPress={() => navigation.navigate('CeritaBaitullahDetail', {idCeritaBaitullah: item.id})} />
                    )
                  })}
                </>
              ) : (
                <></>
              )
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CeritaBaitullahList

const styles = StyleSheet.create({})