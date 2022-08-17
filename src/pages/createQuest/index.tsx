import React from 'react'
import AppLayout from 'src/components/Layout/AppLayout'
import CreateQuestForm from 'src/components/Layout/Forms/CreateQuestForm/LoginForm'
import Nav from 'src/components/Nav'

export default function createQuest () {
  return (<>
        <Nav />
        <AppLayout>
            <CreateQuestForm />

        </AppLayout></>
  )
}
