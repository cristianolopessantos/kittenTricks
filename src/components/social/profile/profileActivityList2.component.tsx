import React from 'react';
import {
  Dimensions,
  FlexStyle,
  ImageSourcePropType,
  ListRenderItemInfo,
  ScaledSize,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from '@kitten/ui';
import {
  ProfileActivityList2Item,
  ProfileActivityList2ItemProps,
} from './profileActivityList2Item.component';

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  data: ImageSourcePropType[];
  onItemPress: (index: number) => void;
  renderItem?: (info: ListRenderItemInfo<ImageSourcePropType>, style: StyleType) => React.ReactElement<any>;
}

type ListItemElement = React.ReactElement<ProfileActivityList2ItemProps>;

const dimensions: ScaledSize = Dimensions.get('window');

export type ProfileActivityList2Props = ThemedComponentProps & ComponentProps;

class ProfileActivityList2Component extends React.Component<ProfileActivityList2Props> {

  static defaultProps: Partial<ProfileActivityList2Props> = {
    numColumns: 3,
  };

  private onItemPress = (index: number) => {
    this.props.onItemPress(index);
  };

  private renderListItemElement = (item: ImageSourcePropType): ListItemElement => {
    const { themedStyle, numColumns } = this.props;

    const size: number = dimensions.width / numColumns;
    const sizeStyle: FlexStyle = {
      width: size,
      height: size,
    };

    return (
      <ProfileActivityList2Item
        style={[themedStyle.item, sizeStyle]}
        activeOpacity={0.75}
        source={item}
        onPress={this.onItemPress}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<ImageSourcePropType>): ListItemElement => {
    const { item, index } = info;

    const listItemElement: ListItemElement = this.renderListItemElement(item);

    return React.cloneElement(listItemElement, { index });
  };

  public render(): React.ReactNode {
    const { contentContainerStyle, themedStyle, ...restProps } = this.props;

    return (
      <List
        {...restProps}
        contentContainerStyle={[themedStyle.container, contentContainerStyle]}
        renderItem={this.renderItem}
      />
    );
  }
}

export const ProfileActivityList2 = withStyles(ProfileActivityList2Component, (theme: ThemeType) => ({
  container: {},
  item: {
    backgroundColor: theme['color-basic-100'],
  },
}));
