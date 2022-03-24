import { shallowMount } from '@vue/test-utils'
import WelcomePage from '@/components/WelcomePage.vue'
import Token from "@/components/Token.vue"
import Form from '@/components/Form.vue'

describe('WelcomePage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Token Seller'
    const wrapper = shallowMount(WelcomePage, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})


describe('Token.vue', () => {
  it('renders props.token when passed', () => {
    const token = "DKS34LW8"
    const wrapper = shallowMount(Token, {
      props: { token }
    })
    expect(wrapper.text()).toMatch(token)
  })
})


describe('Form.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'BUY TOKEN'
    const wrapper = shallowMount(Form, {
      props: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })
})