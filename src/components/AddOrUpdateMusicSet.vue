<template>
  <v-card id="main-card">
    <v-form @submit.prevent="submit">
      <h2 class="text-2xl font-semibold mb-4">{{ createOrAddText }}</h2>
      <v-text-field
        ref="titleInput"
        v-model="title"
        :error-messages="errors.title as string"
        label="Title"
        name="title"
      ></v-text-field>
      <v-text-field
        ref="descriptionInput"
        v-model="description"
        :error-messages="errors.description as string"
        label="Decription"
        name="description"
      ></v-text-field>
      <v-text-field
        ref="creatorInput"
        v-model="creator"
        :error-messages="errors.creator as string"
        label="Creator"
        name="creator"
      ></v-text-field>
      <v-row>
        <set-tunes-edit
          :set-tunes="setTunes"
          @tunes-order-changed="changeSetTunes">
        </set-tunes-edit>
      </v-row>
      <v-row>
        <v-btn
          ref="resetBtn"
          @click="handleReset"
        >Clear
        </v-btn>
        <v-btn
          ref="submitBtn"
          type="submit"
        >{{ createOrAddText }}
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import {useField, useForm} from 'vee-validate';
import * as zod from 'zod';
import {toTypedSchema} from '@vee-validate/zod';
import {CreateSet, MusicSet, Tune} from "@/api-client";
import {computed, onMounted, ref} from "vue";
import SetTunesEdit from "@/components/MusicSetTunesEdit.vue";

const props = defineProps({
  updateSet: {type: Object as () => MusicSet}
})

onMounted(() => {
  if (props.updateSet != undefined) {
    const set = props.updateSet
    title.value = set.title
    description.value = set.description as string
    creator.value = set.creator as string
    setTunes.value = set.tunes as Tune[]
  }
})

const emit = defineEmits(['newMusicSet', 'updateMusicSet'])

const createMusicSetSchema = toTypedSchema(
  zod.object({
    title: zod.string({required_error: 'Title is required'}).trim().min(1),
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
const setTunes = ref(new Array<Tune>);

const submit = handleSubmit(values => {
  if (props.updateSet?.id == undefined) {
    const createSetData = {...values} as CreateSet
    createSetData.tunes = setTunes.value.map((tune: Tune) => tune.id)
    emit('newMusicSet', createSetData)
  } else {
    const updateSetData = {...values} as MusicSet
    updateSetData.id = props.updateSet?.id as number
    updateSetData.tunes = setTunes.value.map((tune: Tune) => tune.id)
    emit('updateMusicSet', updateSetData)
  }

  resetForm();
});

const changeSetTunes = (newTunes: Tune[]) => {
  setTunes.value = newTunes
}

const createOrAddText = computed(() => {
  return props.updateSet?.id == undefined ? 'Create MusicSet' : 'Update MusicSet'
})

</script>
<style scoped>
#main-card {
  padding: 25px;
}
</style>
