import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Card from './Card';
import PropTypes from 'prop-types';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.data.length <= 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontSize: 26, color: '#FFFFFF'}}>
              No record has been found
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.props.data}
            renderItem={({item}) => (
              <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <Card item={item} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({login, campDetailReducer}) => {
  console.log('userasdf', login);
  return {
    loading: campDetailReducer.isloadig ? campDetailReducer.isloadig : false,
    campListing: campDetailReducer.campsiteListing
      ? campDetailReducer.campsiteListing
      : [],
  };
};

List.propTypes = {
  data: PropTypes.array,
};

List.defaultProps = {
  data: [],
};

const mapDispatchToProps = dispatch => ({
  // campList: () => dispatch(AppAction.campsitesList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
const styles = StyleSheet.create({});
