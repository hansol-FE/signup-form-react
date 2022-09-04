import './App.css'
import Footer from './components/Footer'
import Form from './components/Form'
import Modal from './components/Modal'

function App() {
    return (
        <>
            <section className="form-wrapper">
                <Form />
                <Footer />
            </section>
            <Modal />
        </>
    )
}

export default App
