import { Router } from "express";
import { AdminRoutes } from "../modules/admin/admin.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { SpecialtiesRoutes } from "../modules/specialties/specialties.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";
import { PatientRoutes } from "../modules/patient/patient.route";
import { ScheduleRoutes } from "../modules/schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";
import { AppointmentRoutes } from "../modules/appointment/appointment.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { PrescriptionRoutes } from "../modules/prescription/prescription.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { MetaRoutes } from "../modules/meta/meta.routes";

const routes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/meta",
    route: MetaRoutes,
  },
];

const router = Router();
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
