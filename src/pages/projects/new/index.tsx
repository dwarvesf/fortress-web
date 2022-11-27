import { Row, Col, Button, notification, Space, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { PageHeader } from 'components/common/PageHeader'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { ROUTES } from 'constants/routes'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  ModelPosition,
  ModelSeniority,
  PkgHandlerProjectAssignMemberInput,
  PkgHandlerProjectCreateProjectInput,
  ViewPosition,
  ViewProjectMember,
  ViewEmployeeData,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import { format } from 'date-fns'
import { ProjectForm } from 'components/pages/projects/ProjectForm'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ProjectMemberModal } from 'components/pages/projects/ProjectMemberModal'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { StaffTable } from 'components/pages/projects/detail/Staff/StaffTable'

const getPositionsFromIDs = (data: ModelPosition[], positionStrs: string[]) => {
  const result: ViewPosition[] = []
  ;(data || []).forEach((d) => {
    if (d.id && positionStrs.includes(d.id)) {
      result.push({
        code: d.code,
        id: d.id,
        name: d.name,
      })
    }
  })

  return result
}

const getSeniorityFromID = (data: ModelSeniority[], seniorityID: string) => {
  return data?.find((d) => d.id === seniorityID)
}

const CreateNewProjectPage = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { push } = useRouter()

  const [memberData, setMemberData] = useState<
    PkgHandlerProjectAssignMemberInput[]
  >([])
  const [memberTableData, setMemberTableData] = useState<ViewProjectMember[]>(
    [],
  )

  // storing metadata
  const [employeeData, setEmployeeData] = useState<ViewEmployeeData>({})
  const [senioritiesData, setSenioritiesData] = useState<ViewSeniorityResponse>(
    {},
  )
  const [positionsData, setPositionsData] = useState<ViewPositionResponse>({})

  const {
    isOpen: isAddNewMemberDialogOpen,
    onOpen: openAddNewMemberDialog,
    onClose: closeAddNewMemberDialog,
  } = useDisclosure()

  const onSubmit = async (
    values: Required<PkgHandlerProjectCreateProjectInput>,
  ) => {
    try {
      setIsSubmitting(true)

      await client.createNewProject(transformDataToSend(values))

      notification.success({
        message: 'New project successfully created!',
      })

      // Redirect to project list page if create successfully
      setTimeout(() => push(ROUTES.PROJECTS))
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not create new project!',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): PkgHandlerProjectCreateProjectInput => {
    return {
      accountManagerID: values.accountManagerID,
      clientEmail: values.clientEmail,
      countryID: values.countryID,
      deliveryManagerID: values.deliveryManagerID || '',
      members: memberData,
      name: values.name,
      projectEmail: values.projectEmail,
      startDate: values.startDate
        ? String(format(values.startDate.toDate(), SERVER_DATE_FORMAT))
        : '',
      status: values.status,
      type: values.type,
    }
  }

  const transformMemberDataToTableData = useCallback(
    (memberData: PkgHandlerProjectAssignMemberInput): ViewProjectMember => {
      return {
        avatar: employeeData.avatar,
        deploymentType:
          deploymentTypes[memberData.deploymentType as DeploymentType],
        displayName: employeeData.displayName,
        employeeID: memberData.employeeID,
        fullName: employeeData.fullName,
        isLead: memberData.isLead,
        joinedDate: memberData.joinedDate,
        leftDate: memberData.leftDate,
        positions: getPositionsFromIDs(
          positionsData.data || [],
          memberData.positions,
        ),
        rate: memberData.rate,
        seniority: getSeniorityFromID(
          senioritiesData.data || [],
          memberData.seniorityID,
        ),
        status: memberData.status,
      }
    },
    [employeeData, positionsData, senioritiesData],
  )

  // generate data table when new member data added
  useEffect(() => {
    memberData.forEach((d) => {
      const tableData = transformMemberDataToTableData(d)
      setMemberTableData([...memberTableData, tableData])
    })
  }, [JSON.stringify({ memberData, transformMemberDataToTableData })]) // eslint-disable-line

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader title="New project" />
        <Row>
          <Col span={24} lg={{ span: 16 }}>
            <ProjectForm form={form} onSubmit={onSubmit} />
          </Col>

          <Col span={24}>
            <Space
              align="center"
              style={{
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography.Title level={4}>Members</Typography.Title>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={openAddNewMemberDialog}
              >
                Add New
              </Button>
            </Space>

            <StaffTable
              data={memberTableData}
              isLoading={false}
              onAfterAction={() => {}}
            />
          </Col>

          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{ marginTop: 24 }}
              onClick={form.submit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Space>
      <ProjectMemberModal
        isOpen={isAddNewMemberDialogOpen}
        onClose={closeAddNewMemberDialog}
        memberData={memberData}
        setMemberData={setMemberData}
        getDataOnSubmit={(
          e: ViewEmployeeData,
          s: ViewSeniorityResponse,
          p: ViewPositionResponse,
        ) => {
          setEmployeeData(e)
          setSenioritiesData(s)
          setPositionsData(p)
        }}
      />
    </>
  )
}

export default CreateNewProjectPage
