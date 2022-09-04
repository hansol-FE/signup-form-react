import { createContext, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Form from './components/Form'
import Modal from './components/Modal'

const initFormData = {
    id: '',
    pw: '',
    confirmPw: '',
}

export const FormContext = createContext({
    formState: initFormData,
    setFormData: () => {},
})
function App() {
    const [formData, setFormData] = useState(initFormData)
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form />
                <Footer />
            </section>
            <Modal />
        </FormContext.Provider>
    )
}

export default App
