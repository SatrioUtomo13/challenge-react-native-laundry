import { Text, View, SafeAreaView } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/login">Login</Link>
        <Link href="/produk">Produk</Link>
        <Link href="/transaksi">Transaksi</Link>
      </View>
    </SafeAreaView>
  );
}
