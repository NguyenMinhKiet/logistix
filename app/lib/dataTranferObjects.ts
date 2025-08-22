import 'server-only';
import { getUser, UserSummary } from '@/app/lib/dataAccessLayer';
import { db } from '@/app/lib/db';

function canSeeUsername(viewer: UserSummary | null) {
    return true;
}

// function canSeePhoneNumber(viewer: User, team: string) {
//     return viewer. || team === viewer.team;
// }

export async function getProfileDTO(email: string) {
    const user = await db.user.findUnique({
        where: { email },
        // Return specific columns here
    });
    if (!user) return null;

    const userId = user.id;

    const currentUser = await getUser(userId);

    // Or return only what's specific to the query here
    return {
        username: canSeeUsername(currentUser) ? user.name : null,
    };
}
