import { SessionDurationType } from "../Enums/SessionDurationType.enum";
import { SubscriptionType } from "../Enums/SubscriptionType.enum";

export interface SubscribtionPlan {

  id: number;
  name: string;
  type: SubscriptionType;
  duration : SessionDurationType ;

}
  