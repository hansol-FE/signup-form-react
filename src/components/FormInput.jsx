import { useContext, useEffect, useRef } from 'react'
import { FormContext } from '../App'

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidConfirmPw: '비밀번호가 일치하지 않습니다.',
}

const FormInput = ({ id, label, errData, setErrData, inputProps }) => {
    const inputRef = useRef(null)
    const { formData, setFormData } = useContext(FormContext)

    const checkRegex = (inputId) => {
        let result
        const value = formData[inputId]
        if (value.length === 0) {
            result = 'required'
        } else {
            switch (inputId) {
                case 'id':
                    result = ID_REGEX.test(value) ? true : 'invalidId'
                    break
                case 'pw':
                    result = PW_REGEX.test(value) ? true : 'invalidPw'
                    checkRegex('confirmPw')
                    break
                case 'confirmPw':
                    result =
                        value === formData['pw'] ? true : 'invalidConfirmPw'
                    break
                default:
                    return
            }
        }
        //react는 setState를 비동기적으로 실행함
        // 순차적으로 진행하고싶다면 함수를 넘겨주면됨
        //setErrData({ ...errData, [inputId]: result })
        setErrData((prev) => ({ ...prev, [inputId]: result }))
    }

    useEffect(() => {
        if (id === 'id') {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                ref={inputRef}
                value={formData[id]}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [id]: e.target.value }))
                }
                onBlur={() => checkRegex(id)}
                {...inputProps}
            />
            <div className="mt-1 mb-3 text-xs text-red-500">
                {errData[id] !== true ? ERROR_MSG[errData[id]] : ''}
            </div>
        </div>
    )
}

export default FormInput
