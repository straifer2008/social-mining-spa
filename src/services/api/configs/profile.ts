export const defaultProfileConfig = {
  fields: {
    accounts: true,
    username: true,
    name: { placeholder: true },
    photo: true,
    gender: true,
    country: true,
    birthDay: true,
    birthMonth: true,
    birthYear: true,
    status: true,
    platform_status: true,
    contacts: true,
    contactUrl: true,
    mentor: true,
    languages: true,
    update: ['referral_quiz_comments_done'],
    misc: {
      quiz: ['links_activation_quiz'],
      kyc: true,
      withdraw_address_status: true,
      added_to_wait_list: true
    }
  }
}
