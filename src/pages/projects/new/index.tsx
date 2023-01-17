import { Row, Col, Button, notification, Space, Card } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { PageHeader } from 'components/common/PageHeader'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { ROUTES } from 'constants/routes'
import { client, Meta } from 'libs/apis'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  ModelPosition,
  ModelSeniority,
  RequestAssignMemberInput,
  RequestCreateProjectInput,
  ViewPosition,
  ViewProjectMember,
  ViewEmployeeData,
  ViewPositionResponse,
  ViewSeniorityResponse,
  ViewEmployeeListDataResponse,
} from 'types/schema'
import { format } from 'date-fns'
import { ProjectForm } from 'components/pages/projects/add/ProjectForm'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ProjectMemberModal } from 'components/pages/projects/add/ProjectMemberModal'
import { ProjectMemberTable } from 'components/pages/projects/add/ProjectMemberTable'
import { FormWrapper } from 'components/common/FormWrapper'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { getErrorMessage } from 'utils/string'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { Permission } from 'constants/permission'

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

const getEmployeeFromID = (data: ViewEmployeeData[], id: string) => {
  return data?.find((d) => d.id === id)
}

const CreateNewProjectPage = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { push } = useRouter()

  const [memberData, setMemberData] = useState<RequestAssignMemberInput[]>([])
  const [memberTableData, setMemberTableData] = useState<ViewProjectMember[]>(
    [],
  )

  // storing metadata
  const [employeeData, setEmployeeData] = useState<
    ViewEmployeeListDataResponse & Meta
  >({})
  const [senioritiesData, setSenioritiesData] = useState<ViewSeniorityResponse>(
    {},
  )
  const [positionsData, setPositionsData] = useState<ViewPositionResponse>({})

  const {
    isOpen: isAddNewMemberDialogOpen,
    onOpen: openAddNewMemberDialog,
    onClose: closeAddNewMemberDialog,
  } = useDisclosure()

  const onSubmit = async (values: Required<RequestCreateProjectInput>) => {
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
        message: getErrorMessage(error, 'Could not create new project'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): RequestCreateProjectInput => {
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
      function: values.function,
    }
  }

  const transformMemberDataToTableData = useCallback(
    (memberData: RequestAssignMemberInput): ViewProjectMember => {
      return {
        avatar: getEmployeeFromID(
          employeeData.data || [],
          memberData?.employeeID || '',
        )?.avatar,
        deploymentType: memberData.deploymentType,
        displayName: getEmployeeFromID(
          employeeData.data || [],
          memberData?.employeeID || '',
        )?.displayName,
        employeeID: memberData.employeeID,
        fullName: getEmployeeFromID(
          employeeData.data || [],
          memberData?.employeeID || '',
        )?.fullName,
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
    setMemberTableData([])
    const newMemberTableData: ViewProjectMember[] = []

    memberData.forEach((d) => {
      const tableData = transformMemberDataToTableData(d)
      newMemberTableData.push(tableData)
    })

    setMemberTableData(newMemberTableData)
  }, [JSON.stringify({ memberData, transformMemberDataToTableData })]) // eslint-disable-line

  return (
    <>
      <SEO title="Projects - New" />

      <Breadcrumb
        items={[
          {
            label: 'Projects',
            href: ROUTES.PROJECTS,
          },
          {
            label: 'New',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader title="New project" />

        <FormWrapper
          footer={
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              onClick={form.submit}
            >
              Submit
            </Button>
          }
        >
          <Row gutter={[0, 24]}>
            <Col span={24} lg={{ span: 16 }}>
              <ProjectForm form={form} onSubmit={onSubmit} />
            </Col>

            <Col span={24}>
              <TotalResultCount
                count={(memberData || []).length}
                permission={Permission.PROJECTS_CREATE}
              />

              <Card
                title="Members"
                extra={
                  <Button type="primary" onClick={openAddNewMemberDialog}>
                    Add New
                  </Button>
                }
                bodyStyle={{ padding: '1px 0 0' }}
              >
                <ProjectMemberTable
                  data={memberTableData}
                  memberData={memberData}
                  setMemberData={setMemberData}
                  getDataOnSubmit={(
                    e: ViewEmployeeListDataResponse & Meta,
                    s: ViewSeniorityResponse,
                    p: ViewPositionResponse,
                  ) => {
                    setEmployeeData(e)
                    setSenioritiesData(s)
                    setPositionsData(p)
                  }}
                />
              </Card>
            </Col>
          </Row>
        </FormWrapper>
      </Space>

      <ProjectMemberModal
        isOpen={isAddNewMemberDialogOpen}
        onClose={closeAddNewMemberDialog}
        memberData={memberData}
        setMemberData={setMemberData}
        getDataOnSubmit={(
          e: ViewEmployeeListDataResponse & Meta,
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
