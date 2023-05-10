import {beforeEach, describe, expect, it} from "vitest";
import {mount, VueWrapper} from "@vue/test-utils";
import TestRef from "@/components/TestRef.vue";
import {TestType} from "@/components/types";

describe('setting ref', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(TestRef, {})
    wrapper.vm.myVal = {name: 'baba'} as TestType
  })

  it('should set member', () => {
    expect(wrapper.vm.myVal.value.name).toBe('baba')
  })
})
