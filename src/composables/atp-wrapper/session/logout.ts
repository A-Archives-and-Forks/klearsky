import Util from "@/composables/util"

export default async function (this: TIAtpWrapper) {
  // OAuth のログアウト処理
  if (
    this.currentAuthType === "oauth" &&
    this.oauthSession != null
  ) {
    await this.oauthSession.signOut()
    this.oauthSession = undefined
  }

  this.data.did = ""
  Util.saveStorage("atp", this.data)
  this.currentAuthType = undefined
  this.session = undefined
}
