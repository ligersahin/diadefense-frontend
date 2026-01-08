import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function GlobalErrorScreen({ error, retry }: { error: Error; retry?: () => void }) {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}>
        Bir hata oluştu
      </Text>

      <Text style={{ opacity: 0.8, marginBottom: 16 }}>
        Uygulama beklenmeyen bir hatayla karşılaştı. Tekrar deneyebilirsin.
      </Text>

      {/* Debug için: istersen sadece dev'de göster */}
      <Text style={{ fontFamily: "Menlo", fontSize: 12, opacity: 0.6, marginBottom: 20 }}>
        {String(error?.message || error)}
      </Text>

      <TouchableOpacity
        onPress={() => (retry ? retry() : router.replace("/(tabs)/today"))}
        style={{ padding: 14, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>
          Yeniden dene
        </Text>
      </TouchableOpacity>
    </View>
  );
}
