<template>
  <v-card id="main-card">
    <v-form @submit.prevent="submit">
      <h2 class="text-2xl font-semibold mb-4">Create MusicSet</h2>
      <v-text-field
        v-model="title"
        :error-messages="errors.title as string"
        label="Title"
        name="title"
      ></v-text-field>
      <v-text-field
        v-model="description"
        :error-messages="errors.description as string"
        label="Decription"
        name="description"
      ></v-text-field>
      <v-text-field
        v-model="creator"
        :error-messages="errors.creator as string"
        label="Creator"
        name="creator"
      ></v-text-field>
      <v-row>
        <v-btn @click="handleReset">
          clear
        </v-btn>
        <v-btn
          type="submit"
        >Create MusicSet
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import {useField, useForm} from 'vee-validate';
import * as zod from 'zod';
import {toTypedSchema} from '@vee-validate/zod';
import {CreateSet} from "@/api-client";


const emit = defineEmits(['newMusicSet'])
const createMusicSetSchema = toTypedSchema(
  zod.object({
    title: zod.string().min(1, 'Title is required'),
    description: zod.string().optional(),
    creator: zod.string().optional(),
  })
);
const {errors, resetForm, handleReset, handleSubmit} = useForm({
  validationSchema: createMusicSetSchema,
});
const {value: title} = useField<string>('title');
const {value: description} = useField<string>('description');
const {value: creator} = useField<string>('creator');

const submit = handleSubmit(values => {
  const createSetData = {...values} as CreateSet
  emit('newMusicSet', createSetData)
  resetForm();
});

</script>
<style scoped>
#main-card {
  padding: 25px;
}
</style>
