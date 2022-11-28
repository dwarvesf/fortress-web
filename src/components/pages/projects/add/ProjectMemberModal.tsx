import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { Meta } from 'libs/apis'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  PkgHandlerProjectAssignMemberInput,
  ViewEmployeeListDataResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import { MemberForm, MemberFormValues } from '../detail/Member/MemberForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  rowIndex?: number
  initialValues?: MemberFormValues
  onClose: () => void
  memberData: PkgHandlerProjectAssignMemberInput[]
  setMemberData: Dispatch<SetStateAction<PkgHandlerProjectAssignMemberInput[]>>
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
        message:
          error?.message ||
          `Could not ${isEditing ? 'update' : 'assign'} the member!`,
      })
    } finally {
      setIsSubmitting(false)
      if (!isEditing) {
        form.resetFields()
      }
    }
  }

  const transformDataToSend = (
    values: Record<string, any>,
  ): PkgHandlerProjectAssignMemberInput => {
    return {
      deploymentType: values.deploymentType || '',
      discount: values.discount,
      employeeID: values.employeeID,
      isLead: values.isLead,
      joinedDate: values.joinedDate,
      leftDate: values.leftDate,
      positions: values.positions || [],
      rate: parseFloat(values.rate) || 0,
      seniorityID: values.seniorityID || '',
      status: values.status || '',
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
