import {beforeEach, describe, expect, it} from "vitest";
import {mount, VueWrapper} from '@vue/test-utils'
import AddMusicSet from "@/components/AddOrUpdateMusicSet.vue";
import {createVuetify} from "vuetify";
import flushPromises from "flush-promises";
import waitForExpect from "wait-for-expect";
import {CreateSet} from "@/api-client";


describe('AddMusicSet', () => {
  const vuetify = createVuetify()
  let wrapper: VueWrapper<any>, titleInput: VueWrapper<any>, descriptionInput: VueWrapper<any>,
    creatorInput: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AddMusicSet, {
      global: {plugins: [vuetify]}
    })
    titleInput = wrapper.findComponent({ref: 'titleInput'})
    descriptionInput = wrapper.findComponent({ref: 'descriptionInput'})
    creatorInput = wrapper.findComponent({ref: 'creatorInput'})
  })

  it('should show a required message for title field when clicking submit on an empty form', async () => {
    await wrapper.find("form").trigger("submit.prevent")
    await flushPromises()
    await waitForExpect(() => {
      expect(titleInput.props().errorMessages).toEqual('Title is required')
    })
  })

  it('should emit the new music set and reset form afterwards', async () => {
    const expectedVal = {
      title: 'test title',
      description: 'test description',
      creator: 'test creator'
    } as CreateSet

    await titleInput.setValue(expectedVal.title)
    await descriptionInput.setValue(expectedVal.description)
    await creatorInput.setValue(expectedVal.creator)

    await wrapper.find("form").trigger("submit.prevent")
    await flushPromises()
    await waitForExpect(() => {
      const emittedVal = wrapper.emitted().newMusicSet
      expect(emittedVal).toHaveLength(1)
      expect(emittedVal[0] == expectedVal)

      expect(wrapper.vm.title).toBe(undefined)
      expect(wrapper.vm.description).toBe(undefined)
      expect(wrapper.vm.creator).toBe(undefined)
    })
  })

  it('should reset form', async () => {
    await titleInput.setValue('test 123')
    await descriptionInput.setValue('test 123')
    await creatorInput.setValue('test  123')

    await wrapper.findComponent({ref: 'resetBtn'}).trigger("click")
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.vm.title).toBe(undefined)
      expect(wrapper.vm.description).toBe(undefined)
      expect(wrapper.vm.creator).toBe(undefined)
    })
  })
})
