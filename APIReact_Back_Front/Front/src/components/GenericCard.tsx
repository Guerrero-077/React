import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  subtitle?: string;
  imageUrl?: string | number; // opcional
  onEdit?: () => void;
  onDelete?: () => void;
}

const GenericCard: React.FC<Props> = ({
  title,
  subtitle,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  const renderImage = () => {
    if (!imageUrl) return null;

    const source = typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl;

    return <Image source={source} style={styles.image} resizeMode="cover" />;
  };

  return (
    <View style={styles.card}>
      {renderImage()}

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Feather name="edit" size={22} color="#4a90e2" />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <MaterialIcons name="delete-outline" size={24} color="#e74c3c" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  iconButton: {
    marginHorizontal: 4,
    padding: 4,
  },
});

export default GenericCard;
