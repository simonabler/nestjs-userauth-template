export class ReS<T> {
  static FromData<T>(arg0: T): ReS<T> {
    const ret = new ReS<T>();
    ret.success = true;
    ret.data = arg0;
    return ret;
  }

  public success = true;
  public data: T;
}
