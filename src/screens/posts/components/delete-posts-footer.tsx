import React from 'react';
import { Button, Footer, FooterTab, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

function DeletePostsFooter(): JSX.Element {
  return (
    <Footer>
      <FooterTab>
        <Button full danger>
          <Text style={styles.buttonText}>DELETE ALL POSTS</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

export default DeletePostsFooter;
