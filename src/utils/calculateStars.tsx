import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../theme/colors';

export const calculateStars = (rate: number) => {
  const stars = [];
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon key={`full-${i}`} name="star" size={20} color={Colors.PRIMARY} />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Icon key="half" name="star-half" size={20} color={Colors.PRIMARY} />,
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`empty-${i}`}
        name="star-outline"
        size={20}
        color={Colors.PRIMARY}
      />,
    );
  }

  return stars;
};
