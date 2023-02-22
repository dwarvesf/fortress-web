import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { Meta } from 'libs/apis'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  RequestAssignMemberInput,
  ViewEmployeeListDataResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { MemberForm, MemberFormValues } from '../detail/Member/MemberForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  rowIndex?: number
  initialValues?: MemberFormValues
  onClose: () => void
  memberData: RequestAssignMemberInput[]
  setMemberData: Dispatch<SetStateAction<RequestAssignMemberInput[]>>
  getDataOnSubmit?: (
    e: ViewEmployeeListDataResponse & Meta,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
}

export const ProjectMemberModal = (props: Props) => {
  const [form] = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    isOpen,
    isEditing = false,
    rowIndex,
    initialValues,
    onClose,
    memberData,
    setMemberData,
    getDataOnSubmit,
  } = props

  const onSubmit = async (values: MemberFormValues) => {
    try {
      setIsSubmitting(true)

      const newData = transformDataToSend(values)

      if (!isEditing) {
        setMemberData([...memberData, newData])
      } else {
        const currentMemberData = memberData

        const newMemberData = currentMemberData.map((item, j) => {
          if (j === rowIndex) {
            return newData
          }
          return item
        })

        setMemberData(newMemberData)
      }

      notification.success({
        message: `Member ${isEditing ? 'updated' : 'assigned'} successfully!`,
      })

      onClose()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          `Could not ${isEditing ? 'update' : 'assign'} the member!`,
        ),
      })
    } finally {
      setIsSubmitting(false)
      if (!isEditing) {
        form.resetFields()
      }
    }
  }

  const transformDataToSend = (
    values: MemberFormValues,
  ): RequestAssignMemberInput => {
    return {
      deploymentType: values.deploymentType || '',
      discount: values.discount,
      employeeID: values.employeeID,
      isLead: values.isLead,
      startDate: values.startDate?.format(SERVER_DATE_FORMAT) || '',
      endDate: values.endDate?.format(SERVER_DATE_FORMAT) || '',
      positions: values.positions || [],
      rate: parseFloat(values.rate?.toString() || '0'),
      seniorityID: values.seniorityID || '',
      status: values.status || '',
      note: values.note || '',
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title={`${isEditing ? 'Edit' : 'Assign'} member`}
    >
      <MemberForm
        isAssigning
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
        getDataOnSubmit={getDataOnSubmit}
      />
    </Modal>
  )
}
