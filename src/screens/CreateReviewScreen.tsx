import React, { useLayoutEffect, useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createReviewRef, uploadImage } from "../lib/firebase";
import { UserContext } from "../contexts/userContext";
import firebase from "firebase";
import { pickImage } from "../lib/image-picker";
import { getExtension } from "../utils/file";
import { ReviewsContext } from "../contexts/reviewsContext";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/Review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }
    setLoading(true);

    //documentのIDを先に取得
    const reviewDocRef = await createReviewRef(shop.id);

    //storageのpathを決定
    const ext = getExtension(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;

    //画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);

    //reviewドキュメントを作る

    const review = {
      id: reviewDocRef.id,
      user: {
        name: user.name,
        id: user.id,
      },
      shop: {
        name: shop.name,
        id: shop.id,
      },
      text: text,
      score: score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    // await addReview(shop.id, review);

    //レビュー一覧に即時反映させるsetREviewContext
    setReviews([review, ...reviews]); //今回のreviewを、従来のreview(...のやつ)に追加する
    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View>
          <StarInput score={score} onChangeScore={(value) => setScore(value)} />
          <TextArea
            value={text}
            onChangeText={(value) => setText(value)}
            label="商品名"
            placeholder="商品名をここに記入してください"
          />
          <View style={styles.photoContainer}>
            <IconButton name="camera" onPress={onPickImage} color="#ccc" />
            {!!imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}
          </View>
          <Button text="評価を投稿" onPress={onSubmit} />
        </View>
      </TouchableWithoutFeedback>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E4",
    // alignItems: "center",
    // justifyContent: "center",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
