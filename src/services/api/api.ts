import { AuthApiService } from './AuthApiService'
import { LocationApiService } from './LocationApiService'
import { UserApiService } from './UserApiService'
import { ReferralApiService } from './ReferralApiService'
import { DashboardApiService } from './DashboardApiService'
import { TransactionsApiService } from './TransactionsApiService'
import { SharedApiService } from './SharedApiService'
import { LaunchpadApiService } from './LaunchpadApiService'
import { BlogsApiService } from './BlogsApiService'


export const $api = (app: any) => {
  return {
    auth: new AuthApiService({ app }),
    location: new LocationApiService({ app }),
    user: new UserApiService({ app }),
    referral: new ReferralApiService({ app }),
    dashboard: new DashboardApiService({ app }),
    transactions: new TransactionsApiService({ app }),
    shared: new SharedApiService({ app }),
    launchpad: new LaunchpadApiService({ app }),
    blogs: new BlogsApiService({ app }),
  }
}
