import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

interface ComponentProps extends IButtonProps {
  children: string;
  type?: "PRIMARY" | "SECONDARY";
}

export function Button({
  type = "PRIMARY",
  children,
  ...anotherProps
}: ComponentProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...anotherProps}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        textTransform="uppercase"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {children}
      </Text>
    </NativeBaseButton>
  );
}
