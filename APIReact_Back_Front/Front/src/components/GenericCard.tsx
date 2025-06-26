import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface GenericCardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function GenericCard({
  title,
  subtitle,
  children,
  onEdit,
  onDelete,
}: GenericCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {title && (
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}

        {children && <View style={styles.content}>{children}</View>}
      </View>

      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={onEdit}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} // Área táctil aumentada
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onDelete}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "100%",
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  content: {
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8, // Espacio consistente entre botones
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minHeight: 32, // Altura mínima para buena interacción táctil
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 13,
    includeFontPadding: false, // Mejor alineación vertical
  },
});
