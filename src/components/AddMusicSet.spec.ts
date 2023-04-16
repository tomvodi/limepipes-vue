import {describe, expect, it} from "vitest";
import {mount} from '@vue/test-utils'
import AddMusicSet from "@/components/AddMusicSet.vue";
import {createVuetify} from "vuetify";
import flushPromises from "flush-promises";
import waitForExpect from "wait-for-expect";


describe('AddMusicSet', () => {
  const vuetify = createVuetify()

  it('should show a required message for title field when clicking submit on an empty form', async () => {
    const wrapper = mount(AddMusicSet, {
      global: {plugins: [vuetify]}
    })
    const title = wrapper.findComponent({ref: 'titleInput'})

    await wrapper.find("form").trigger("submit.prevent")
    await flushPromises()
    await waitForExpect(() => {
      expect(title.props().errorMessages).toEqual('Title is required')
    })
  })
})
