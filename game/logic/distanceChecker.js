class DistanceChecker {
    static canReachTarget(player, target, playersList) {
        let distance = this.getFinalDistance(player, target, playersList);
        return player.getWeapon().getRange() >= distance;
    }

    static getFinalDistance(player, target, playersList) {
        let baseDistance = this.getBaseDistance(player, target, playersList);
        let finalDistance = baseDistance + this.getDistanceModifier(player, target);

        return finalDistance <= 0 ? 1 : finalDistance;
    }

    static getDistanceModifier(player, target) {
        let playerBuffs = player.getBuffs();
        let targetBuffs = target.getBuffs();
        let distanceModifier = 0;

        for (let i in playerBuffs) {
            if (playerBuffs.hasOwnProperty(i)) {
                if (playerBuffs[i].isScope()) {
                    distanceModifier--;
                    break;
                }
            }
        }

        for (let i in targetBuffs) {
            if (targetBuffs.hasOwnProperty(i)) {
                if (targetBuffs[i].isMustang()) {
                    distanceModifier++;
                    break;
                }
            }
        }

        return distanceModifier;
    }

    static getBaseDistance(player, target, playersList) {
        let playerIndex = playersList.indexOf(player);
        let left = playerIndex;
        let right = playerIndex;
        let distance = 0;

        while (true) {
            left--;
            right++;
            distance++;

            if (left < 0) {
                left = playersList.length - 1;
            }

            if (right > playersList.length - 1) {
                right = 0;
            }

            if (playersList[left].getId() === target.getId() || playersList[right].getId() === target.getId()) {
                break;
            }
        }

        return distance;
    }
}

export default DistanceChecker;