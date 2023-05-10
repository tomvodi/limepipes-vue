import {beforeEach, describe, expect, it, vi} from "vitest";
import {mount, VueWrapper} from "@vue/test-utils";
import {createVuetify} from "vuetify";
import MusicSetTunesEdit from "@/components/MusicSetTunesEdit.vue";
import {Tune} from "@/api-client";
import {nextTick, ref} from "vue";
import {apiClientInjKey} from "@/injection_keys";
import WrapperLike from "@vue/test-utils/dist/interfaces/wrapperLike";


describe('MusicSetTunesEdit', () => {
  const vuetify = createVuetify()
  let wrapper: VueWrapper<any>
  let tuneRows: WrapperLike[]
  const firstTune: Tune = {id: 1, title: 'first tune'}
  const secondTune: Tune = {id: 2, title: 'second tune'}
  const thirdTune: Tune = {id: 3, title: 'third tune'}
  const selectionTune: Tune = {id: 4, title: 'selection tune'}

  vi.mock('@/queries/tunes', () => {
    return {
      useTunes() {
        return {
          data: ref<Tune[]>([
            {id: 4, title: 'selection tune'}
          ])
        }
      }
    }
  })

  beforeEach(() => {
    const metaApiClient = {}
    wrapper = mount(MusicSetTunesEdit, {
      global: {
        plugins: [vuetify],
        provide: {[apiClientInjKey]: metaApiClient},
      },
      props: {
        setTunes: [
          firstTune,
          secondTune,
          thirdTune
        ] as Tune[]
      }
    })
    tuneRows = wrapper.findAllComponents('.tune-sort-row')
  })

  it('should render tunes', async () => {
    expect(tuneRows.length).toBe(3)
  })

  it('should show only down-button on first element', () => {
    expect(tuneRows[0].find('.down-button').exists()).toBe(true);
    expect(tuneRows[0].find('.up-button').exists()).toBe(false);
  })

  it('should show up and down button on second element', () => {
    expect(tuneRows[1].find('.down-button').exists()).toBe(true);
    expect(tuneRows[1].find('.up-button').exists()).toBe(true);
  })

  it('should show only up-button on third element', () => {
    expect(tuneRows[2].find('.down-button').exists()).toBe(false);
    expect(tuneRows[2].find('.up-button').exists()).toBe(true);
  })

  it('should disable add button when no tune is selected', () => {
    const addBtn = wrapper.findComponent({ref: 'add-tune-button'})
    expect(addBtn.element.disabled).toBe(true);
  })

  it('should enable add button when tune is selected', () => {
    wrapper.vm.selectedTune.value = selectionTune
    const addBtn = wrapper.findComponent({ref: 'add-tune-button'})
    expect(addBtn.element.disabled).toBe(false);
  })

  describe('moving the second tune upwards', () => {
    beforeEach(async () => {
      await tuneRows[1].find('.up-button').trigger('click')
    })

    it('emits the new tune order', () => {
      expect(wrapper.emitted()).toHaveProperty('tunesOrderChanged')
      const orderChangeEvent = wrapper.emitted('tunesOrderChanged')
      expect(orderChangeEvent).not.toBe(undefined)
      expect(orderChangeEvent[0][0]).toEqual(
        [
          secondTune,
          firstTune,
          thirdTune
        ]
      )
    })
  })

  describe('moving the second tune down', () => {
    beforeEach(async () => {
      await tuneRows[1].find('.down-button').trigger('click')
    })

    it('emits the new tune order', () => {
      expect(wrapper.emitted()).toHaveProperty('tunesOrderChanged')
      const orderChangeEvent = wrapper.emitted('tunesOrderChanged')
      expect(orderChangeEvent).not.toBe(undefined)
      expect(orderChangeEvent[0][0]).toEqual(
        [
          firstTune,
          thirdTune,
          secondTune,
        ]
      )
    })
  })

  describe('deleting the second tune', () => {
    beforeEach(async () => {
      await tuneRows[1].find('.delete-button').trigger('click')
    })

    it('emits the new tune order', () => {
      expect(wrapper.emitted()).toHaveProperty('tunesOrderChanged')
      const orderChangeEvent = wrapper.emitted('tunesOrderChanged')
      expect(orderChangeEvent).not.toBe(undefined)
      expect(orderChangeEvent[0][0]).toEqual(
        [
          firstTune,
          thirdTune,
        ]
      )
    })
  })

  describe('adding a new tune', () => {
    beforeEach(async () => {
      // wrapper.vm.selectedTunes.value = [selectionTune]
      // const combo = wrapper.findComponent({ref: 'add-tune-select'})
      // combo.vm.filteredItems = [selectionTune]
      // console.log(combo.html())
      wrapper.vm.selectedTune.value = selectionTune
      await nextTick();
      await wrapper.findComponent({ref: 'add-tune-button'}).trigger('click')
    })

    it('emits the new tune order', () => {
      expect(wrapper.emitted()).toHaveProperty('tunesOrderChanged')
      const orderChangeEvent = wrapper.emitted('tunesOrderChanged')
      expect(orderChangeEvent).not.toBe(undefined)
      expect(orderChangeEvent[0][0]).toEqual(
        [
          firstTune,
          secondTune,
          thirdTune,
          selectionTune
        ]
      )
    })
  })


})
