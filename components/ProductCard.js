import React from 'react'
import { View, Image } from 'react-native'
import {
  Text,
  Button,
  ClearButton,
  Card
} from '../components/themed/ThemedComponents'
import { useTheme } from '../contexts/ThemeContext'

const ProductCard = ({
  category,
  title,
  price,
  image,
  saved,
  addToFavorites
}) => {
  const { colors } = useTheme()
  return (
    <Card>
      <Text variant='subtitle'>{category}</Text>
      <Text variant='body' style={{ marginVertical: 8 }} numberOfLines={2}>
        {title}
      </Text>
      <Text variant='subtitle' style={{ color: colors.success }}>
        {price}
      </Text>
      <View style={styles.imageContainer}>
        <Image
          resizeMode={'contain'}
          source={{
            uri: image
          }}
          style={styles.productImage}
        />
      </View>

      <Button
        noMargin
        label={saved ? 'Saved' : 'Save item'}
        onPress={addToFavorites}
        disabled={saved}
      />
    </Card>
  )
}

const styles = {
  productImage: {
    height: 150,
    width: 200,
    alignSelf: 'center'
  },
  imageContainer: {
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
}

export default ProductCard
