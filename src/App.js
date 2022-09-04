import { createContext, useRef, useState } from 'react'
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
    const modalRef = useRef(null)
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form modalRef={modalRef} />
                <Footer />
            </section>
            <Modal ref={modalRef} />
        </FormContext.Provider>
    )
}

export default App
