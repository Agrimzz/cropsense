import { CustomButton } from "@/components/ui/CustomButton";
import { FormField } from "@/components/ui/FormField";
import { useApiMutation } from "@/hooks/useApiMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecommendSchema, recommendSchema } from "./schema/recommendSchema";

export function Recommend() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecommendSchema>({
    resolver: zodResolver(recommendSchema),
    defaultValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      ph: "",
      temperature: "",
      humidity: "",
      rainfall: "",
      latitude: "",
      longitude: "",
    },
  });

  const { mutate: recommend, isPending } = useApiMutation(
    "post",
    "/cropsense/v1/recommend/"
  );

  const onSubmit = (data: RecommendSchema) => {
    const payload = {
      nitrogen: Number(data.nitrogen),
      phosphorus: Number(data.phosphorus),
      potassium: Number(data.potassium),
      ph: Number(data.ph),
      temperature: Number(data.temperature),
      humidity: Number(data.humidity),
      rainfall: Number(data.rainfall),
    };
    recommend(payload, {
      onSuccess: (res: any) => {
        console.log(res);
        router.replace(`/recommendation/${res.input_data.id}`);
      },
      onError: (err: any) => {
        let message = "Something went wrong. Please try again.";

        // Axios error with response
        if (err?.response?.status) {
          const status = err.response.status;
          if (status === 400) {
            message = "Register Failed. Email already in use.";
          } else if (status === 401) {
            message = "Incorrect email or password.";
          } else if (status === 403) {
            message = "You are not authorized to access this resource.";
          } else if (status === 500) {
            message = "Server error. Please try again later.";
          }
        }

        Alert.alert("Login Failed", message);
      },
    });
  };

  const handleDetectLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setValue("latitude", location.coords.latitude.toString());
      setValue("longitude", location.coords.longitude.toString());
    } catch {
      Alert.alert("Error", "Could not detect location");
    }
  };

  return (
    <SafeAreaView className="w-full h-screen bg-background px-4">
      {/* Header */}
      <TouchableOpacity
        className="py-2 flex flex-row gap-2 items-center"
        onPress={() => router.back()}
      >
        <ChevronLeft size={24} color="#f5f5dc" strokeWidth={1.5} />
        <Text className="text-textPrimary text-lg font-semibold">
          Get Recommendation
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} className="gap-4 mt-4">
        {/* NPK */}
        <View className="flex flex-row justify-between gap-2">
          <Controller
            control={control}
            name="nitrogen"
            render={({ field }) => (
              <FormField
                title="Nitrogen"
                placeholder="N value"
                value={field.value}
                handleChangeText={field.onChange}
                containerStyles="w-[32%]"
                error={errors.nitrogen?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phosphorus"
            render={({ field }) => (
              <FormField
                title="Phosphorus"
                placeholder="P value"
                value={field.value}
                containerStyles="w-[32%]"
                handleChangeText={field.onChange}
                error={errors.phosphorus?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="potassium"
            render={({ field }) => (
              <FormField
                title="Potassium"
                placeholder="K value"
                value={field.value}
                containerStyles="w-[32%]"
                handleChangeText={field.onChange}
                error={errors.potassium?.message}
              />
            )}
          />
        </View>

        {/* Environmental */}
        <Controller
          control={control}
          name="ph"
          render={({ field }) => (
            <FormField
              title="pH Level"
              placeholder="Soil pH"
              value={field.value}
              containerStyles="mt-4"
              handleChangeText={field.onChange}
              error={errors.ph?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="temperature"
          render={({ field }) => (
            <FormField
              title="Temperature (°C)"
              placeholder="Temperature"
              value={field.value}
              containerStyles="mt-4"
              handleChangeText={field.onChange}
              error={errors.temperature?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="humidity"
          render={({ field }) => (
            <FormField
              title="Humidity (%)"
              placeholder="Humidity"
              value={field.value}
              containerStyles="mt-4"
              handleChangeText={field.onChange}
              error={errors.humidity?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rainfall"
          render={({ field }) => (
            <FormField
              title="Rainfall (mm)"
              placeholder="Rainfall"
              value={field.value}
              containerStyles="mt-4"
              handleChangeText={field.onChange}
              error={errors.rainfall?.message}
            />
          )}
        />

        {/* Location */}
        <View className="flex flex-row justify-between gap-2 items-end mt-4">
          <Controller
            control={control}
            name="latitude"
            render={({ field }) => (
              <FormField
                title="Latitude"
                placeholder="Latitude"
                value={field.value}
                containerStyles="w-[32%]"
                handleChangeText={field.onChange}
                error={errors.latitude?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="longitude"
            render={({ field }) => (
              <FormField
                title="Longitude"
                placeholder="Longitude"
                value={field.value}
                containerStyles="w-[32%]"
                handleChangeText={field.onChange}
                error={errors.longitude?.message}
              />
            )}
          />

          <CustomButton
            title={`Detect \n Location`}
            handlePress={handleDetectLocation}
            containerStyles="px-4 flex-1 h-[65px] mb-1"
            textStyles="text-center font-pregular text-sm"
          />
        </View>

        <CustomButton
          title="Get Recommendation"
          containerStyles="mt-4"
          isLoading={isPending}
          handlePress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
